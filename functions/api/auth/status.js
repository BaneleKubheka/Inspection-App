function cookie(req,name){const c=req.headers.get('Cookie')||'';return c.split(';').map(x=>x.trim()).find(x=>x.startsWith(name+'='))?.slice(name.length+1)}
function parse(v){if(!v)return null;try{return JSON.parse(decodeURIComponent(escape(atob(v.replace(/-/g,'+').replace(/_/g,'/')))))}catch{return null}}
export async function onRequest({request}){const a=parse(cookie(request,'IA_AUTH'));return Response.json(a?{signedIn:true,email:a.email,name:a.name}:{signedIn:false})}
