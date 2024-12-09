interface StatProps {
  value: number;
  title: string;
}

export const Stat = ({ value, title }: StatProps) => {
  return (
    <div className="stats border-2">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        {/* <div className="stat-desc">21% more than last month</div> */}
      </div>
    </div>
  );
};
