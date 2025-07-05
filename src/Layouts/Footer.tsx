function Footer() {
  return (
    <footer className="flex items-center bg-gray-800 text-gray-400 py-4 h-[90px]">
      <div className="mx-auto px-4 text-center">
        <p>Email: thanh.danh@gmail.com</p>
        <p>© {new Date().getFullYear()} TODO APP. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
