import{r as O,j as r,a as G}from"./app-df35aaf5.js";import{m as a}from"./id-50c09ee7.js";function P({presensiData:h,nama_guru:R,title:$}){const[m,q]=O.useState([]);console.log(h);const F=()=>{const l=h.map(s=>s.tanggal.split("-")[1]),e=l.filter((s,n)=>l.indexOf(s)===n).sort((s,n)=>s-n).map(s=>h.filter(n=>n.tanggal.split("-")[1]===s));q(e)};return O.useEffect(()=>{F()},[]),r.jsxs("div",{className:"w-full flex flex-col gap-5 justify-center items-center px-5 py-2",children:[r.jsx(G,{title:$}),r.jsx("div",{className:"w-full flex flex-row gap-5 justify-center items-center",children:r.jsxs("h1",{className:"text-2xl font-bold text-gray-500",children:["Cetak Laporan Semester ",R]})}),r.jsxs("div",{className:"w-full flex flex-row gap-2 justify-end items-center",children:[r.jsx("h1",{children:"Total"}),r.jsx("h1",{className:"text-md font-bold text-gray-500",children:h.length}),r.jsx("h1",{children:"Hadir"}),r.jsx("h1",{className:"text-md font-bold text-green-500",children:h.filter(l=>{var i,e;return((e=(i=l==null?void 0:l.data_presensi.jam_masuk)==null?void 0:i.kehadiran)==null?void 0:e.kehadiran)==="Hadir"}).length}),r.jsx("h1",{children:"Izin"}),r.jsx("h1",{className:"text-md font-bold text-yellow-500",children:h.filter(l=>{var i,e;return((e=(i=l==null?void 0:l.data_presensi.jam_masuk)==null?void 0:i.kehadiran)==null?void 0:e.kehadiran)==="Izin"}).length}),r.jsx("h1",{children:"Sakit"}),r.jsx("h1",{className:"text-md font-bold text-blue-500",children:h.filter(l=>{var i,e;return((e=(i=l==null?void 0:l.data_presensi.jam_masuk)==null?void 0:i.kehadiran)==null?void 0:e.kehadiran)==="Sakit"}).length}),r.jsx("h1",{children:"Terlambat"}),r.jsx("h1",{className:"text-md font-bold text-pink-500",children:h.filter(l=>{var i,e;return((e=(i=l==null?void 0:l.data_presensi.jam_masuk)==null?void 0:i.kehadiran)==null?void 0:e.kehadiran)==="Terlambat"}).length}),r.jsx("h1",{children:"Alpa"}),r.jsx("h1",{className:"text-md font-bold text-red-500",children:h.filter(l=>{var i,e;return((e=(i=l==null?void 0:l.data_presensi.jam_masuk)==null?void 0:i.kehadiran)==null?void 0:e.kehadiran)==="Alpa"}).length})]}),m?m.map((l,i)=>r.jsxs("div",{className:"w-full flex flex-col gap-5",children:[r.jsxs("div",{className:"w-full flex flex-row gap-2 justify-start items-center",children:[r.jsx("h1",{children:"Bulan :"}),r.jsx("h1",{className:"text-md font-bold text-gray-500",children:a(l[0].tanggal).locale("id").format("MMMM")})]}),r.jsxs("table",{className:"w-full border-collapse border border-gray-300",children:[r.jsx("thead",{children:r.jsx("tr",{children:r.jsx("th",{className:"border border-gray-300 p-2",colSpan:l.length,children:"Hari / Tanggal"})})}),r.jsx("tbody",{children:r.jsx("tr",{children:l.sort((e,s)=>new Date(e.tanggal)-new Date(s.tanggal)).map((e,s)=>r.jsx("td",{className:"border border-gray-300 p-2 ",children:a(e.tanggal).locale("id").format("dd")},s))})}),r.jsx("tbody",{children:r.jsx("tr",{children:l.sort((e,s)=>new Date(e.tanggal)-new Date(s.tanggal)).map((e,s)=>{var n,t,c,x,o,j,k,g,d,f,u,b,p,_,N,y,w,S,T,I,D,H,v,z,A,M,B,C,E,L,U;return r.jsx("td",{className:`border border-gray-300  p-2 ${(n=e==null?void 0:e.data_presensi)!=null&&n.jam_masuk||(t=e==null?void 0:e.data_presensi)!=null&&t.jam_keluar?(c=e==null?void 0:e.data_presensi)!=null&&c.jam_masuk?((j=(o=(x=e==null?void 0:e.data_presensi)==null?void 0:x.jam_masuk)==null?void 0:o.kehadiran)==null?void 0:j.kehadiran)==="Hadir"?"bg-green-500":((d=(g=(k=e==null?void 0:e.data_presensi)==null?void 0:k.jam_masuk)==null?void 0:g.kehadiran)==null?void 0:d.kehadiran)==="Izin"?"bg-yellow-500":((b=(u=(f=e==null?void 0:e.data_presensi)==null?void 0:f.jam_masuk)==null?void 0:u.kehadiran)==null?void 0:b.kehadiran)==="Sakit"?"bg-blue-500":((N=(_=(p=e==null?void 0:e.data_presensi)==null?void 0:p.jam_masuk)==null?void 0:_.kehadiran)==null?void 0:N.kehadiran)==="Terlambat"?"bg-red-500":"":(y=e==null?void 0:e.data_presensi)!=null&&y.jam_keluar?((T=(S=(w=e==null?void 0:e.data_presensi)==null?void 0:w.jam_keluar)==null?void 0:S.kehadiran)==null?void 0:T.kehadiran)==="Hadir"?"bg-green-500":((H=(D=(I=e==null?void 0:e.data_presensi)==null?void 0:I.jam_keluar)==null?void 0:D.kehadiran)==null?void 0:H.kehadiran)==="Izin"?"bg-yellow-500":((A=(z=(v=e==null?void 0:e.data_presensi)==null?void 0:v.jam_keluar)==null?void 0:z.kehadiran)==null?void 0:A.kehadiran)==="Sakit"?"bg-blue-500":((C=(B=(M=e==null?void 0:e.data_presensi)==null?void 0:M.jam_keluar)==null?void 0:B.kehadiran)==null?void 0:C.kehadiran)==="Terlambat"?"bg-pink-500":((U=(L=(E=e==null?void 0:e.data_presensi)==null?void 0:E.jam_keluar)==null?void 0:L.kehadiran)==null?void 0:U.kehadiran)==="Alpa"?"bg-red-500":"":"bg-red-500":"bg-red-500"}`,children:a(e.tanggal).locale("id").format("DD")},s)})})})]}),r.jsxs("div",{className:"w-full flex flex-row gap-2 justify-start items-center",children:[r.jsx("h1",{children:"Total"}),r.jsx("h1",{className:"text-md font-bold text-gray-500",children:l.length}),r.jsx("h1",{children:"Hadir"}),r.jsx("h1",{className:"text-md font-bold text-green-500",children:l.filter(e=>{var s,n;return((n=(s=e==null?void 0:e.data_presensi.jam_masuk)==null?void 0:s.kehadiran)==null?void 0:n.kehadiran)==="Hadir"}).length}),r.jsx("h1",{children:"Izin"}),r.jsx("h1",{className:"text-md font-bold text-yellow-500",children:l.filter(e=>{var s,n;return((n=(s=e==null?void 0:e.data_presensi.jam_masuk)==null?void 0:s.kehadiran)==null?void 0:n.kehadiran)==="Izin"}).length}),r.jsx("h1",{children:"Sakit"}),r.jsx("h1",{className:"text-md font-bold text-blue-500",children:l.filter(e=>{var s,n;return((n=(s=e==null?void 0:e.data_presensi.jam_masuk)==null?void 0:s.kehadiran)==null?void 0:n.kehadiran)==="Sakit"}).length}),r.jsx("h1",{children:"Terlambat"}),r.jsx("h1",{className:"text-md font-bold text-pink-500",children:l.filter(e=>{var s,n;return((n=(s=e==null?void 0:e.data_presensi.jam_masuk)==null?void 0:s.kehadiran)==null?void 0:n.kehadiran)==="Terlambat"}).length}),r.jsx("h1",{children:"Alpa"}),r.jsx("h1",{className:"text-md font-bold text-red-500",children:l.filter(e=>{var s,n;return((n=(s=e==null?void 0:e.data_presensi.jam_masuk)==null?void 0:s.kehadiran)==null?void 0:n.kehadiran)==="Alpa"}).length})]})]},i)):r.jsx("td",{className:"border border-gray-300 p-2"})]})}export{P as default};