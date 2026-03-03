 const PageTitle=({title,subtitle,children})=>{
    return<div className="flex items-center justify-between text-2xl font-base mt-5">
        <div  className="text-slate-800">
            <h1>{title}</h1>
        </div>
        {
            subtitle && (
                <div>{subtitle}</div>
            )
        }
        {
            children && {children}
        }
    </div>
 }
 export default PageTitle;