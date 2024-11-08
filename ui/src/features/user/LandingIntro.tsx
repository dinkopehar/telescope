import TemplatePointers from "./components/TemplatePointers";

function LandingIntro() {
  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <h1 className="text-3xl text-center font-bold ">Telescope</h1>

          <TemplatePointers />
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;
