const Footer = () => {
  return (
    <footer className="border-t border-gray-800">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Venark. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
