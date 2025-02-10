interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <div className="border-gradient">
      <button className="border-gradient-inner" {...props}>
        {children}
      </button>
    </div>
  );
};
