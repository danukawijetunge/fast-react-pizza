import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 px-4 py-3 sm:px-6 bg-yellow-500 uppercase font-pizza">
      <Link to="/" className="tracking-widest uppercase">Fast React Pizza Co.</Link>
      <SearchOrder />
      <Username/>
    </header>
  );
}

export default Header;
