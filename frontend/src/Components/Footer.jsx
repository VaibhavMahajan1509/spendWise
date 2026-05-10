// src/components/Footer.jsx

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-4 mt-auto border-t border-white/10 text-sm">
      <p>
        &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;