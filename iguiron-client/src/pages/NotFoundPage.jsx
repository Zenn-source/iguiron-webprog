import Button from "../components/Button";

function NotFoundPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-[#ADADD8] bg-white/30 backdrop-blur-sm px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8888C0]">
            Error
          </p>
          <p className="mt-4 text-8xl font-bold leading-none select-none text-[#000] sm:text-9xl">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold text-stone-900 sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
            The link you followed to get here must be broken, or the page has
            been moved. Head back home and try again.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/" variant="primary">Back to Home</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;
