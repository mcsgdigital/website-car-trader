export default function Layout({ children }) {  
    console.log("Rendering Layout component");
    
    return (    
        <div className="relative max-w-[1152px] mx-auto px-4">          
            {children}    
        </div>  
    );
}