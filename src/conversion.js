const FLOW_DOWNLOAD_URL='https://runable.com/download?utm_source=flow_landing&utm_medium=website&utm_campaign=flow_conversion';

function FlowPrimaryCTA({location='section',label='Download Flow free',className=''}){
 return o.jsxs('a',{href:FLOW_DOWNLOAD_URL,className:`${Kv({variant:'primary'})} signup-button flow-download-cta ${className}`,'data-flow-event':'download_click','data-flow-location':location,children:[
  o.jsx(wr,{className:'fb-apple',size:19,'aria-hidden':'true'}),
  o.jsx('span',{children:label}),
  o.jsx('span',{className:'sr-only',children:' for Mac'}),
  o.jsx(Ft,{className:'signup-arrow',size:17,'aria-hidden':'true'})
 ]})
}

function FlowHeroActions(){
 return o.jsxs('div',{className:'flow-hero-actions',children:[
  o.jsxs('div',{className:'flow-hero-buttons',children:[
   o.jsx(FlowPrimaryCTA,{location:'hero'}),
   o.jsxs('a',{href:'#dictation-demo',className:'flow-secondary-cta','data-flow-event':'demo_click','data-flow-location':'hero',children:[o.jsx('span',{className:'flow-play-dot','aria-hidden':'true',children:'▶'}),'See Flow in action',o.jsx('small',{children:'45 sec'})]})
  ]}),
  o.jsx('p',{className:'flow-cta-note',children:'Free on Mac. Review every word before it is sent.'})
 ]})
}

function FlowProofStrip(){
 const facts=[['fn','One key to start'],['✓','Filler-free text'],['↗','Works where you type'],['100+','Languages']];
 return o.jsx('section',{className:'flow-proof-strip','aria-label':'Flow product highlights',children:o.jsx('div',{className:'flow-proof-inner',children:facts.map(([icon,label])=>o.jsxs('div',{className:'flow-proof-item',children:[o.jsx('strong',{children:icon}),o.jsx('span',{children:label})]},label))})})
}

function FlowWhySection(){
 return o.jsxs('section',{id:'why-flow',className:'flow-why section-shell','aria-labelledby':'flow-why-title',children:[
  o.jsxs('div',{className:'flow-why-copy',children:[
   o.jsx('span',{className:'flow-section-label',children:'WHY FLOW'}),
   o.jsxs('h2',{id:'flow-why-title',children:['Speech goes in.',o.jsx('br',{}),o.jsx('em',{children:'Polished writing comes out.'})]}),
   o.jsx('p',{children:'Ordinary dictation transcribes what you say. Flow understands the correction you meant, removes the filler, and leaves the final thought ready to use.'})
  ]}),
  o.jsxs('div',{className:'flow-compare-grid',children:[
   o.jsxs('article',{className:'flow-compare-card is-raw',children:[o.jsx('span',{children:'WHAT YOU SAY'}),o.jsx('p',{children:'“Hi Sarah, um, can we meet at twelve, actually one?”'}),o.jsx('small',{children:'Natural, messy speech'})]}),
   o.jsx('div',{className:'flow-compare-arrow','aria-hidden':'true',children:'→'}),
   o.jsxs('article',{className:'flow-compare-card is-clean',children:[o.jsx('span',{children:'WHAT FLOW TYPES'}),o.jsx('p',{children:'“Hi Sarah, can we meet at one?”'}),o.jsx('small',{children:'Clean and ready to review'})]})
  ]})
 ]})
}

function FlowTrustSection(){
 const controls=[
  ['You stay in control','Flow places text at your cursor. You review, edit, and send it yourself.'],
  ['Works across your Mac','Use the same fn-key interaction in email, messages, notes, documents, and other text fields.'],
  ['Privacy without guesswork','Review Runable’s privacy policy and terms before enabling microphone access.']
 ];
 return o.jsxs('section',{className:'flow-trust section-shell','aria-labelledby':'flow-trust-title',children:[
  o.jsxs('div',{className:'flow-trust-heading',children:[o.jsx('span',{className:'flow-section-label',children:'CONTROL AND PRIVACY'}),o.jsxs('h2',{id:'flow-trust-title',children:['Your words.',o.jsx('br',{}),o.jsx('em',{children:'Your final say.'})]})]}),
  o.jsx('div',{className:'flow-trust-grid',children:controls.map(([title,copy],index)=>o.jsxs('article',{children:[o.jsx('span',{children:`0${index+1}`}),o.jsx('h3',{children:title}),o.jsx('p',{children:copy})]},title))}),
  o.jsxs('a',{className:'flow-text-link',href:'https://runable.com/privacy','data-flow-event':'privacy_click',children:['Read Runable’s privacy policy',o.jsx(Ft,{size:16,'aria-hidden':'true'})]})
 ]})
}

function FlowMeasurement(){
 M.useEffect(()=>{
  const push=(name,detail={})=>{
   const event={event:`flow_${name}`,...detail,path:location.pathname,timestamp:Date.now()};
   window.dataLayer=window.dataLayer||[];window.dataLayer.push(event);
   window.dispatchEvent(new CustomEvent('flow:analytics',{detail:event}));
  };
  const click=event=>{const target=event.target.closest?.('[data-flow-event]');if(target)push(target.dataset.flowEvent,{location:target.dataset.flowLocation||'page',label:(target.textContent||'').trim().replace(/\s+/g,' ').slice(0,80)})};
  document.addEventListener('click',click);
  const seen=new Set(),observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting&&!seen.has(entry.target)){seen.add(entry.target);push('section_view',{section:entry.target.id||entry.target.dataset.analyticsSection||entry.target.className.split(' ')[0]});observer.unobserve(entry.target)}}),{threshold:.35});
  document.querySelectorAll('main section').forEach(section=>observer.observe(section));
  const hero=document.querySelector('.fb-hero'),motion=document.querySelector('.motion-review');
  const heroObserver=hero&&motion?new IntersectionObserver(([entry])=>motion.classList.toggle('is-away',!entry.isIntersecting),{threshold:.08}):null;if(hero&&heroObserver)heroObserver.observe(hero);
  push('page_view',{referrer:document.referrer||'direct'});
  return()=>{document.removeEventListener('click',click);observer.disconnect();heroObserver?.disconnect()};
 },[]);
 return null
}
