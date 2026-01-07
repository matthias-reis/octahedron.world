const Variants = () => (
  <>
    <div className="grow flex-1 bg-saturated-400"></div>
    <div className="grow flex-1 bg-complement"></div>
    <div className="grow flex-1 bg-decent-400"></div>
    <div className="grow flex-1 bg-decent-500"></div>
  </>
);

const Page = () => (
  <body className="bg-decent-100">
    <div className="w-[600px] mx-auto border">
      <div className="flex items-stretch justify-stretch h-7 red">
        <div className="grow flex-1 bg-main">Red</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 orange">
        <div className="grow flex-1 bg-main">Orange</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 tan">
        <div className="grow flex-1 bg-main">Tan</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 yellow">
        <div className="grow flex-1 bg-main">Yellow</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 lime">
        <div className="grow flex-1 bg-main">Lime</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 olive">
        <div className="grow flex-1 bg-main">Olive</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 green">
        <div className="grow flex-1 bg-main">Green</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 wood">
        <div className="grow flex-1 bg-main">Wood</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 cyan">
        <div className="grow flex-1 bg-main">Cyan</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7">
        <div className="grow flex-1 bg-main">Original</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 sky">
        <div className="grow flex-1 bg-main">Sky</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 blue">
        <div className="grow flex-1 bg-main">Blue</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 violet">
        <div className="grow flex-1 bg-main">Violet</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 purple">
        <div className="grow flex-1 bg-main">Purple</div>
        <Variants />
      </div>
      <div className="flex items-stretch justify-stretch h-7 carmine">
        <div className="grow flex-1 bg-main">Carmine</div>
        <Variants />
      </div>
    </div>
  </body>
);

export default Page;
