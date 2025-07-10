import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import routes from "../routes/routes";

function Main() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br bg-gray-300 text-white">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#034447] to-[#4facfe]">
            HELLO, I AM
          </span>
          <span className="block text-[#1d989f]">THANH DANH</span>
        </h1>

        <p className="text-xl md:text-2xl font-light text-gray-800 mb-8">
          I'm a Front-end Developer
        </p>

        <Link
          to={routes.signin}
          className="inline-flex items-center px-6 py-3 bg-[#2f77c8] text-white rounded-full font-semibold hover:bg-[#4facfe] transition-all duration-300 shadow-lg"
        >
          Get Started
          <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
        </Link>
      </div>
    </section>
  );
}

export default Main;
