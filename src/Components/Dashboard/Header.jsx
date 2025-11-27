import image from "../../assets/logo.png";
const Header = () => {
  return (
    <header className="flex items-center justify-between px-3 py-1  text-white bg-[#16a8ad]">
      <div className="flex items-center gap-2">
        <img src={image} className="h-14 " alt="" />
      </div>
      <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full">
        <span className="text-sm text-white">👤</span>
      </div>
    </header>
  );
};
export default Header;
