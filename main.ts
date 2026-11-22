// tiny-stack-vm-01: complete VM for the tiny stack ISA v1. Node 22 stdlib-only, deterministic.
import{mkdirSync as m,readdirSync as r,readFileSync as f,writeFileSync as w}from'node:fs';
import{join as j}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function run(p,n){
 const s=[],c=[],M=new Int32Array(256);let o='',q=0,x=0,t=0;

 const P=v=>{if(s.length>255)throw 3;s.push(v|0)};
 const g=()=>{if(!s.length)throw 2;return s.pop()};
 const h=k=>{if(q+k>p.length)throw 9;let v=0;for(let i=0;i<k;i++)v|=p[q++]<<8*i;return v};
 const W=a=>{if(o.length+a.length>65536)throw 11;o+=a};
 const b2=F=>{if(s.length<2)throw 2;const y=g(),a=g();P(F(a,y))};
 const u1=F=>{if(!s.length)throw 2;P(F(g()))};

 try{for(;;){
  if(t++>999999)throw 10;
  if(q<0||q>=p.length)throw 9;
  const z=p[q++];
  switch(z){
  case 0:return[o,0];
  case 1:P((h(1)<<24)>>24);break;
  case 2:P(h(4));break;
  case 3:g();break;
  case 4:if(!s.length)throw 2;P(s[s.length-1]);break;
  case 5:if(s.length<2)throw 2;s.push(s.splice(s.length-2,1)[0]);break;
  case 6:if(s.length<2)throw 2;P(s[s.length-2]);break;
  case 7:if(s.length<3)throw 2;s.push(s.splice(s.length-3,1)[0]);break;
  case 16:b2((a,b)=>a+b);break;
  case 17:b2((a,b)=>a-b);break;
  case 18:b2((a,b)=>Math.imul(a,b));break;
  case 19:b2((a,b)=>{if(!b)throw 4;return a/b});break;
  case 20:b2((a,b)=>{if(!b)throw 4;return a%b});break;
  case 21:b2((a,b)=>{if(!b)throw 4;return(a>>>0)/(b>>>0)});break;
  case 22:b2((a,b)=>{if(!b)throw 4;return(a>>>0)%(b>>>0)});break;
  case 23:u1(a=>-a);break;
  case 24:b2((a,b)=>a&b);break;
  case 25:b2((a,b)=>a|b);break;
  case 26:b2((a,b)=>a^b);break;
  case 27:u1(a=>~a);break;
  case 28:b2((a,b)=>a<<(b&31));break;
  case 29:b2((a,b)=>a>>(b&31));break;
  case 30:b2((a,b)=>a>>>(b&31));break;
  case 32:b2((a,b)=>a==b?1:0);break;
  case 33:b2((a,b)=>a<b?1:0);break;
  case 34:b2((a,b)=>(a>>>0)<(b>>>0)?1:0);break;
  case 48:{const y=h(2);q+=(y<<16)>>16}break;
  case 49:{const y=h(2);if(!g())q+=(y<<16)>>16}break;
  case 50:{const y=h(2);if(g())q+=(y<<16)>>16}break;
  case 51:{const y=h(2);if(c.length>63)throw 7;c.push(q);q=y}break;
  case 52:if(!c.length)throw 8;q=c.pop();break;
  case 64:{const a=g();if(a<0||a>255)throw 6;P(M[a])}break;
  case 65:{const a=g(),v=g();if(a<0||a>255)throw 6;M[a]=v}break;
  case 80:W(String(g()));break;
  case 81:W(String.fromCharCode(g()&255));break;
  case 82:P(x<n.length?n[x++]:-1);break;
  case 83:return[o,g()&255];
  default:throw 5;
  }
 }}catch(e){return[o,+e||0]}
}

for(const id of r(I).sort()){const[a,e]=run(f(j(I,id,'program.bin')),f(j(I,id,'input.bin')));m(j(O,id),{recursive:!0});w(j(O,id,'stdout.bin'),Buffer.from(a,'latin1'));w(j(O,id,'exit.txt'),e+'\n')}
