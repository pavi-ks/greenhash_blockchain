function Footer() {
    return (
      <footer className="bg-green-600 text-white py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">GreenHash 🌿</h3>
            <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="space-x-6 text-sm">
            <a href="/about" className="hover:text-green-200">About</a>
            <a href="/dashboard" className="hover:text-green-200">Dashboard</a>
            <a href="/login" className="hover:text-green-200">Login</a>
            <a href="https://github.com/" target="_blank" className="hover:text-green-200" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  