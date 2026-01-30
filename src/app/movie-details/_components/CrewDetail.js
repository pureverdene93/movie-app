export const CrewDetail = (props) => {
  const { name, job } = props;
  return (
    <div className="flex gap-[8px] flex-col">
      <div className="flex gap-[60px] max-sm:gap-[30px]">
        <p className="text-foreground text-[16px] font-bold w-[64px] max-sm:text-[14px]">{job}</p>
        <p className="text-muted-foreground text-[16px] font-[300] max-sm:text-[14px]">{name}</p>
      </div>
      <div className="border-border border-t w-full"></div>
    </div>
  );
};
