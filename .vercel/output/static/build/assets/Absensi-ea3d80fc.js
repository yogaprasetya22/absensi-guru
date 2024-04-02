import{r as t,j as e,d as g}from"./app-df35aaf5.js";import{L as j}from"./Layout-af7b5ed3.js";import{R as N}from"./react-paginate-216f81d2.js";import{m as c}from"./id-50c09ee7.js";import"./transition-73bc14cb.js";function P({data_presensi:l}){const[n,x]=t.useState(0),[r,u]=t.useState([]),[h,f]=t.useState(0),[p,d]=t.useState(!1),[o,v]=t.useState(5);t.useEffect(()=>{d(!0);const s=parseInt(n)+parseInt(o),a=l==null?void 0:l.sort((m,b)=>new Date(b.guru.nuptk)-new Date(m.guru.nuptk)).slice(n,s);u(a),f(Math.ceil((l==null?void 0:l.length)/o)),d(!1)},[n,l,o]);const i=s=>{window.scrollTo({top:0,behavior:"smooth"});const a=s.selected*o%(l==null?void 0:l.length);x(a)};return e.jsx(j,{children:e.jsx("div",{className:"bg-white flex flex-col gap-10 rounded-xl shadow-lg relative",children:e.jsxs("div",{className:"overflow-x-auto ",children:[e.jsx("div",{className:"bg-white w-full h-[6rem] rounded-t-md ",children:e.jsx("div",{className:"w-full t-0 px-5 -mt-5 absolute",children:e.jsx("div",{className:"bg-violet-400/80 w-full rounded-md shadow-md h-[6rem] flex flex-row gap-2 justify-between items-center px-5",children:e.jsx("div",{className:"flex flex-row items-center justify-between w-full relative",children:e.jsxs("div",{className:"flex flex-col gap-2 items-center",children:[e.jsx("h1",{className:"font-extrabold text-blue-900 text-lg",children:"Daftar data"}),e.jsx("p",{className:"font-extrabold text-white text-md",children:"SMPN XYZ"})]})})})})}),e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"font-bold text-lg text-black",children:[e.jsx("th",{children:"NUPTK"}),e.jsx("th",{children:"Nama"}),e.jsx("th",{children:"Kelas"}),e.jsx("th",{children:"No Telp"}),e.jsx("th",{children:"Alamat"}),e.jsx("th",{children:"Action"})]})}),r==null?void 0:r.map((s,a)=>e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"font-bold",children:s==null?void 0:s.guru.nuptk})}),e.jsx("td",{children:e.jsx("div",{className:"font-bold",children:s==null?void 0:s.guru.user.name})}),e.jsx("td",{children:e.jsx("div",{className:"font-bold",children:s==null?void 0:s.guru.kelas.kelas})}),e.jsx("td",{children:e.jsx("div",{className:"font-bold",children:s==null?void 0:s.guru.telp})}),e.jsx("td",{children:e.jsx("div",{className:"font-bold max-w-[15rem] truncate",children:s==null?void 0:s.guru.alamat})}),e.jsx("th",{className:"flex gap-2",children:e.jsx(g,{className:"btn btn-ghost btn-md ",href:`/kurikulum/absensi-guru/${s.guru.uuid}?bulan=${c().format("MM")}&tahun=${c().format("YYYY")}
                                                `,children:e.jsx("i",{className:"text-green-500 text-xl fas fa-eye"})})})]})},a))]}),e.jsx("div",{className:"flex justify-normal items-center py-5",children:e.jsx(N,{className:"flex flex-row gap-1 w-full justify-end items-center select-none pr-10",nextLabel:">",onPageChange:i,pageRangeDisplayed:2,marginPagesDisplayed:1,pageCount:h,previousLabel:"<",pageClassName:" text-sm border  p-2 rounded-md ",pageLinkClassName:" rounded-md  px-2 py-2 font-semibold font-roboto",previousClassName:" p-2 rounded-md text-blue-800 hover:scale-125 hover:scale text-xl",previousLinkClassName:"text-xl p-2  font-semibold font-roboto",nextClassName:" p-2 rounded-md text-blue-800 hover:scale-125 hover:scale text-xl",nextLinkClassName:"text-xl p-2  font-semibold font-roboto ",breakLabel:"...",breakClassName:" p-2 rounded-md text-blue-800",breakLinkClassName:"text-sm font-semibold font-roboto ",containerClassName:"pagination",activeClassName:"bg-transparan border border-blue-800 text-blue-800"})})]})})})}export{P as default};
