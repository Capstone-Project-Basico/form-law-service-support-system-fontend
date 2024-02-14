import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

const Carousel = ({ children: slides }) => {
  return (
    <div className="overflow-hidden">
      <div className="flex min-w-9 min-h-48">{slides}</div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button className="p-1 shadown bg-slate-400 text-white hover:bg-slate-600">
          <ChevronLeftIcon className="w-10 h-10 text-white" />
        </button>
        <button className="p-1 shadown bg-slate-400 text-white hover:bg-slate-600">
          <ChevronRightIcon className="w-10 h-10 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
