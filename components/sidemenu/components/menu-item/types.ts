import { ButtonProps } from '@/components/button';
import { ReactNode } from 'react';

export interface MenuItemProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  badgeContent?: string | number;
  badgeVariant?: 'primary' | 'outline';
  buttonVariant?: "link" | "primary" | "secondary" | "black" | "destructive" | "outline" | "ghost";
}

export interface MenuSectionProps {
  title: string;
  children: ReactNode;
}
