import * as C from './styles';

type Props = {
  label: string
}

export default function CustonButton({label}: Props) {
  return (
    <C.CustonButton>{label}</C.CustonButton>
  );
}