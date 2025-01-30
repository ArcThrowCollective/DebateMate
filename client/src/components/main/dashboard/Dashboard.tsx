import './Dashboard.css';

interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({
  children,

  ...props
}) => {
  return (
    <div id="dashboard" {...props}>
      {children}
    </div>
  );
};
