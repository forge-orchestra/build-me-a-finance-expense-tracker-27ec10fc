import { FC } from 'react';
import { LucideIcon, IconProps } from 'lucide-react';

interface IconComponentProps extends IconProps {
  name: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: FC<IconComponentProps> = ({ name: IconName, size = 24, color = 'currentColor', className = '', ...rest }) => {
  return (
    <IconName
      size={size}
      color={color}
      className={`text-${color} ${className}`}
      aria-hidden="true"
      focusable="false"
      {...rest}
    />
  );
};

export default Icon;