import "./button.scss";
type ButtonProps = {
  title: string;
};

export default function Button({ title }: ButtonProps) {
  return <button>{title}</button>;
}
