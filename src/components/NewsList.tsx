const mockData = [
  {
    title: "Head1",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.`,
  },
  {
    title: "Head2",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.`,
  },
  {
    title: "Head3",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.`,
  },
  {
    title: "Head4",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.`,
  },
  {
    title: "Head5",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.`,
  },
  {
    title: "Head6",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.`,
  },
  {
    title: "Head7",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.`,
  },
  {
    title: "Head8",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.`,
  },
  {
    title: "Head9",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.`,
  },
  {
    title: "Head10",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.`,
  },
  {
    title: "Head11",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptate, repudiandae ad? Eos quo repellendus nam.`,
  },
];

const NewsList = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ul className='xl:w-5/6 w-full xl:h-1/2 h-[500px] rounded-sm flex flex-row flex-wrap overflow-auto gap-1 disable-scrollbars'>
        {mockData.map((data) => (
          <li key={data.title} className='bg-white text-zinc-900 xl:border xl:rounded-xl py-2 px-4'>
            <h3 className='font-semibold'>{data.title}</h3>
            <p>{data.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
