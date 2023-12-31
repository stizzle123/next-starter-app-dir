import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sideMenuVariants = cva(
  "md:flex flex-col hidden fixed inset-0 h-full border-r border-border dark:border-border-dark",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        info: "bg-info text-info-foreground",
        warning: "text-orange-600",
        error: "bg-destructive text-destructive-foreground",
      },
      size: {
        default: "w-[300px]",
        small: "w-[200px]",
        large: "w-[400px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const SideMenuRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof sideMenuVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(sideMenuVariants({ variant, size }), className)}
    {...props}
  />
));

SideMenuRoot.displayName = "SideMenuRoot";

const Brand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between px-5 h-[4.4rem] border-b border-border dark:border-border-dark",
        props.className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
});

Brand.displayName = "Brand";

const Content = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className={cn("p-4 overflow-y-scroll h-screen", props.className)}
      {...props}
    />
  );
});

const Footer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center absolute bottom-0 w-full justify-between px-5 h-[4.4rem] border-t border-border dark:border-border-dark",
        props.className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
});

Footer.displayName = "Footer";

interface NavigationMenuLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  iconleft?: React.ReactNode;
  iconright?: React.ReactNode;
}

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  NavigationMenuLinkProps
>((props, ref) => {
  return (
    <Link
      ref={ref}
      className={cn(
        "flex items-center gap-4 w-full px-4 py-3 text-base font-medium text-left text-gray-800 transition-colors duration-200 dark:text-slate-50 ",
        props.className
      )}
      {...props}
    >
      {props.iconleft && <div>{props.iconleft}</div>}
      {props.children}
      {props.iconright && (
        <div
          className={cn(
            "items-center flex-grow flex-shrink-0 flex justify-end w-4 h-4 text-gray-400 dark:text-slate-600"
          )}
        >
          {props.iconright}
        </div>
      )}
    </Link>
  );
});

NavigationMenuLink.displayName = "NavigationMenuLink";

interface NavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const NavigationMenu = React.forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ active, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col w-full rounded-md overflow-hidden my-2 transition-all hover:bg-gray-100 dark:bg-transparent dark:hover:bg-slate-900/80 hover:text-gray-900 dark:hover:text-slate-100 active:bg-gray-100 dark:active:bg-gray-900/80",
          active &&
            "bg-gray-100 dark:bg-slate-900/80 text-gray-900 dark:text-slate-100",
          props.className
        )}
        {...props}
      />
    );
  }
);

NavigationMenu.displayName = "NavigationMenu";

const SideMenu = Object.assign(SideMenuRoot, {
  Brand,
  NavigationMenu,
  NavigationMenuLink,
  Content,
  Footer,
});

export { SideMenu };
