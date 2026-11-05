'use strict';
const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
const groupId = (value) => `grupo-${normalize(value).replace(/\s+/g, '-')}`;
let content;
const expanded = new Set();
function nameHTML(name, query) {
  const [surname, ...given] = name.split(',');
  function highlight(text) {
    const term = query.trim();
    const start = normalize(text).indexOf(normalize(term));
    if (!term || start < 0) return escapeHTML(text);
    return `${escapeHTML(text.slice(0,start))}<mark>${escapeHTML(text.slice(start,start+term.length))}</mark>${escapeHTML(text.slice(start+term.length))}`;
  }
  return `<li><span class="surname">${highlight(surname)}</span><span class="given">${highlight(given.join(',').trim())}</span></li>`;
}
function sectionBody(section, courses, query) {
  if (section.kind === 'authorities') {
    return section.people.map(([role,name]) => `<div class="person"><span>${escapeHTML(role)}</span><strong>${escapeHTML(name)}</strong></div>`).join('') + `<a class="detail-source" href="${escapeHTML(section.source)}" target="_blank" rel="noopener">Autoridades en el sitio institucional ↗</a>`;
  }
  if (section.kind === 'program') return `<p class="status-note">${escapeHTML(section.status)}</p><ol class="program">${section.items.map(item=>`<li>${escapeHTML(item)}</li>`).join('')}</ol>`;
  if (section.kind === 'hymn') return `<p class="hymn-copy">Himno de la Universidad Nacional de Cuyo.</p><a class="button" href="${escapeHTML(section.url)}" target="_blank" rel="noopener">Consultar el himno <span aria-hidden="true">↗</span></a>`;
  return courses.map(course=>`<div class="course">${section.courses.length>1 ? `<h4>${escapeHTML(course.title)}</h4>`:''}<ul class="names">${course.names.map(name=>nameHTML(name,query)).join('')}</ul></div>`).join('');
}
function render(query='') {
  const tokens = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const searching = tokens.length>0;
  const groups = new Map();
  const actRows = [];
  let results=0;
  content.sections.forEach((section,index)=>{
    if(section.kind !== 'graduates') {
      actRows.push(`<details id="${section.id}" ${expanded.has(section.id)?'open':''}><summary><span class="row-number">${String(index+1).padStart(2,'0')}</span><span class="row-title">${escapeHTML(section.title)}</span><span class="row-icon" aria-hidden="true">+</span></summary><div class="detail-body">${sectionBody(section,null,'')}</div></details>`);
      return;
    }
    let courses=section.courses;
    if(searching) {
      if(section.kind!=='graduates') return;
      courses=section.courses.map(course=>({...course,names:course.names.filter(name=>tokens.every(token=>normalize(`${name} ${course.title} ${section.title}`).includes(token)))})).filter(course=>course.names.length);
      if(!courses.length) return;
    }
    const count = courses ? courses.reduce((sum,course)=>sum+course.names.length,0) : null;
    if(count!==null) results+=count;
    const isOpen=searching || expanded.has(section.id);
    const row=`<details id="${section.id}" ${isOpen?'open':''}><summary><span class="row-number">${String(index+1).padStart(2,'0')}</span><span class="row-title">${escapeHTML(section.title)}</span>${count!==null?`<span class="row-count">${count} ${count===1?'egresade':'egresades'}</span>`:''}<span class="row-icon" aria-hidden="true">+</span></summary><div class="detail-body">${sectionBody(section,courses,query)}</div></details>`;
    if(!groups.has(section.group)) groups.set(section.group,[]);
    groups.get(section.group).push(row);
  });
  $('#act-sections').innerHTML=`<section class="section-group" id="grupo-el-acto" aria-labelledby="grupo-el-acto-title"><div class="group-heading"><h2 id="grupo-el-acto-title">El acto</h2><span>4 SECCIONES</span></div>${actRows.join('')}</section>`;
  $('#sections').innerHTML=[...groups].map(([group,rows])=>`<section class="section-group" id="${groupId(group)}" aria-labelledby="${groupId(group)}-title"><div class="group-heading"><h3 id="${groupId(group)}-title">${escapeHTML(group)}</h3><span>${rows.length} ${rows.length===1?'SECCIÓN':'SECCIONES'}</span></div>${rows.join('')}</section>`).join('');
  $('#empty').hidden=groups.size>0;
  $('#clear-search').hidden=!query;
  $('#search-status').textContent=searching ? `${results} ${results===1?'coincidencia':'coincidencias'} en la nómina de egresades.` : 'Explorá las secciones o buscá en la nómina.';
  document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{
    if(!searching || detail.closest('#act-sections')) {
      if(detail.open) expanded.add(detail.id); else expanded.delete(detail.id);
    }
  }));
}
function resetSearch(){ $('#search').value='';render();$('#search').focus(); }
function openHash() {
  const id=decodeURIComponent(location.hash.slice(1));
  if(!id) return;
  let target=document.getElementById(id);
  if(!target && $('#search').value) {$('#search').value='';render();target=document.getElementById(id);}
  if(target?.tagName==='DETAILS'){target.open=true;expanded.add(id);target.scrollIntoView({block:'start'});}
}
async function init(){
  try {
    const response=await fetch('contenido.json');
    if(!response.ok) throw new Error('Contenido no disponible');
    content=await response.json();
    render();openHash();
    $('#search').addEventListener('input',event=>render(event.target.value));
    $('#clear-search').addEventListener('click',resetSearch);
    $('#reset-search').addEventListener('click',resetSearch);
    window.addEventListener('hashchange',openHash);
    document.querySelectorAll('.side-index a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{if($('#search').value){$('#search').value='';render();}}));
  } catch(error){
    $('#act-sections').innerHTML=`<section class="section-group" id="grupo-el-acto" aria-labelledby="grupo-el-acto-title"><div class="group-heading"><h2 id="grupo-el-acto-title">El acto</h2><span>4 SECCIONES</span></div>${actRows.join('')}</section>`;
  $('#sections').innerHTML='<p class="status-note">No pudimos cargar la guía. Podés recargar la página o consultar la nómina completa.</p><a class="text-link" href="nomina-egresades.txt">Abrir la nómina de egresades ↓</a>';
    $('#search').disabled=true;
    $('#search-status').textContent='La búsqueda estará disponible cuando se cargue la guía.';
  }
}
init();
