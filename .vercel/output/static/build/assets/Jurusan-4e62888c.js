import{r as t,j as e}from"./app-df35aaf5.js";import{L as b}from"./Layout-af7b5ed3.js";import{R as p}from"./react-paginate-216f81d2.js";import"./transition-73bc14cb.js";function y({data:l}){const[r,d]=t.useState(0),[x,c]=t.useState([]),[i,m]=t.useState(0),[g,o]=t.useState(!1),[n,j]=t.useState(5);t.useEffect(()=>{o(!0);const s=parseInt(r)+parseInt(n),a=l.sort((h,u)=>h.id-u.id).slice(r,s);c(a),m(Math.ceil(l.length/n)),o(!1)},[r,l,n]);const f=s=>{window.scrollTo({top:0,behavior:"smooth"});const a=s.selected*n%l.length;d(a)};return e.jsx(b,{children:e.jsx("div",{className:"bg-white flex flex-col gap-10 rounded-xl shadow-lg relative",children:e.jsxs("div",{className:"overflow-x-auto ",children:[e.jsx("div",{className:"bg-white w-full h-[6rem] rounded-t-md ",children:e.jsx("div",{className:"w-full t-0 px-5 -mt-5 absolute",children:e.jsxs("div",{className:"bg-violet-400/80 w-full rounded-md shadow-md h-[6rem] flex flex-row gap-2 justify-between items-center px-5",children:[e.jsx("div",{className:"flex flex-row items-center justify-between w-full relative",children:e.jsxs("div",{className:"flex flex-col gap-2 items-center",children:[e.jsx("h1",{className:"font-extrabold text-blue-900 text-lg",children:"Daftar data"}),e.jsx("p",{className:"font-extrabold text-white text-md",children:"SMPN XYZ"})]})}),e.jsx("div",{className:"flex flex-row items-center gap-2",children:e.jsx("div",{className:"flex items-center gap-2 px-5 py-3",children:e.jsxs("button",{className:"btn bg-gray-200/60 text-gray-500 rounded-md",children:[e.jsx("i",{className:"fas fa-plus"})," Add Jurusan"]})})})]})})}),e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"font-bold text-lg text-black",children:[e.jsx("th",{children:"Id"}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Action"})]})}),x.map((s,a)=>e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("th",{children:s==null?void 0:s.id}),e.jsx("td",{children:e.jsx("div",{className:"font-bold",children:s==null?void 0:s.jurusan})}),e.jsxs("th",{className:"flex gap-2",children:[e.jsx("button",{className:"btn btn-ghost btn-md ",children:e.jsx("i",{className:"text-green-500 text-xl fas fa-edit"})}),e.jsx("button",{className:"btn btn-ghost btn-md ",children:e.jsx("i",{className:"text-red-500 text-xl fas fa-trash-alt"})})]})]})},a))]}),e.jsx("div",{className:"flex justify-normal items-center py-5",children:e.jsx(p,{className:"flex flex-row gap-1 w-full justify-end items-center select-none pr-10",nextLabel:">",onPageChange:f,pageRangeDisplayed:2,marginPagesDisplayed:1,pageCount:i,previousLabel:"<",pageClassName:" text-sm border  p-2 rounded-md ",pageLinkClassName:" rounded-md  px-2 py-2 font-semibold font-roboto",previousClassName:" p-2 rounded-md text-blue-800 hover:scale-125 hover:scale text-xl",previousLinkClassName:"text-xl p-2  font-semibold font-roboto",nextClassName:" p-2 rounded-md text-blue-800 hover:scale-125 hover:scale text-xl",nextLinkClassName:"text-xl p-2  font-semibold font-roboto ",breakLabel:"...",breakClassName:" p-2 rounded-md text-blue-800",breakLinkClassName:"text-sm font-semibold font-roboto ",containerClassName:"pagination",activeClassName:"bg-transparan border border-blue-800 text-blue-800"})})]})})})}export{y as default};