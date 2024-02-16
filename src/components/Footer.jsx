function Footer () {
        const stile = {
                        height:'45px',
        }
        return (
                <footer className="fixed-bottom bg-dark text-white text-center py-3" style = {stile}>
                <p>&copy; {new Date().getFullYear()} Youssef El Meliani. All rights reserved.</p>
              </footer>
        )
}
export default Footer ;