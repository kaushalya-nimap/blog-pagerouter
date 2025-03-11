export default function Navbar(){
    return(
      <>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <div>Home</div>
            <div >
                <ul style={{listStyle:"none",display:"flex",flexDirection:"row"}}>
                    <li>Todos</li>
                    <li>About us</li>
                    <li>Contact us</li>
                </ul>
            </div>
        </div>
      </>
    )
}