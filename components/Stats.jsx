import GitHubCalendar from "react-github-calendar";

const Stats = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <div className="container mx-auto">
        <div className="max-w-[80vw] xl:max-w-none mx-auto">
          <div className="flex items-center justify-center mt-10 xl:mt-0">
            <GitHubCalendar username="Alvarizqi09" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
