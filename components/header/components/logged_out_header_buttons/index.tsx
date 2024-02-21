"use client";
import Image from "next/image";
import Link from "next/link";
import MockupLogo from "../../../../public/assets/svg/mockup-logo.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./components/list_item";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";

const LoggedOutHeaderButtons = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/authentication?mode=signup");
  };

  const handleSignIn = () => {
    router.push("/authentication?mode=signin");
  };

  return (
    <>
      <Link href="/" className="h-fit lg:min-w-fit">
        <Image priority src={MockupLogo} alt="Logo" width={180} height={180} />
      </Link>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Para alunos</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Image
                      src="https://images.unsplash.com/photo-1600195077077-7c815f540a3d?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted object-cover no-underline outline-none focus:shadow-md"
                      alt="Image of a female student studying in her bedroom with a laptop and books."
                      width={300}
                      height={300}
                    />
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Para instituições</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Image
                      src="https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted object-cover no-underline outline-none focus:shadow-md"
                      alt="Image of a female student studying in her bedroom with a laptop and books."
                      width={300}
                      height={300}
                    />
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden xl:flex">
            <Link href="/privacy-policy" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Privacidade e Segurança
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <section className="hidden w-fit gap-x-2 md:flex">
        <Button variant="white" size="lg" onClick={handleSignIn}>
          Entrar
        </Button>
        <Button variant="primary" size="lg" onClick={handleSignUp}>
          Cadastrar-se
        </Button>
      </section>

      <Drawer>
        <DrawerTrigger asChild>
          <Button className="flex p-3 md:hidden" variant="wrapper">
            <Menu color="#a1a1aa" />
          </Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay className="fixed inset-0 z-40 bg-black/40" />

          <DrawerContent className="w-10/12 bg-white lg:w-2/3">
            <div className="flex size-full flex-col">
              <DrawerTitle className="flex w-full justify-between">
                <Link
                  href="/dashboard"
                  className="flex size-full px-3 py-4"
                >
                  <Image
                    priority
                    src={MockupLogo}
                    alt="Mock up logo"
                    width={180}
                    height={100}
                  />
                </Link>
                <DrawerClose className="p-3">
                  <X size="1.8rem" />
                </DrawerClose>
              </DrawerTitle>
              <div className="flex h-full flex-col overflow-y-scroll p-4">
                <Card
                  key="1"
                  className="mx-auto flex max-h-[200px] w-full items-center overflow-hidden rounded-lg transition-all duration-200"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1600195077077-7c815f540a3d?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="object-cover"
                    alt="Image of a female student studying in her bedroom with a laptop and books."
                    width={200}
                    height={200}
                  />
                  <CardContent className="p-4">
                    <h2 className="text-sm font-medium leading-none">
                      Para alunos
                    </h2>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <DrawerFooter className="mb-0 p-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleSignUp}
                >
                  Cadastrar-se
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleSignIn}
                >
                  Entrar
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </>
  );
};

export default LoggedOutHeaderButtons;
