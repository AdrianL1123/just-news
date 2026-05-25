import { Link, useParams } from "@tanstack/react-router";
import { useIsFetching } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { COUNTRIES, CATEGORIES } from "@/config/nav";
import { todayKey } from "@/lib/news";

interface CategoryMenuItemProps {
  countryCode: string;
  categoryId: string;
  label: string;
  Icon: LucideIcon;
  isActive: boolean;
}

function CategoryMenuItem({
  countryCode,
  categoryId,
  label,
  Icon,
  isActive,
}: CategoryMenuItemProps) {
  const isLoading =
    useIsFetching({
      queryKey: ["news", countryCode, categoryId, todayKey()],
    }) > 0;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="border-l-2 border-transparent data-[active=true]:text-primary data-[active=true]:bg-primary/[0.08] data-[active=true]:font-medium data-[active=true]:border-l-primary data-[active=true]:[&>svg]:text-primary"
      >
        <Link to="/$country/$category" params={{ country: countryCode, category: categoryId }}>
          <Icon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
      {isLoading && (
        <SidebarMenuAction asChild>
          <span className="pointer-events-none flex items-center justify-center">
            <Spinner className="size-3.5 text-foreground/50" />
          </span>
        </SidebarMenuAction>
      )}
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const { country: activeCountry, category: activeCategory } = useParams({
    strict: false,
  });

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        {COUNTRIES.map((country, idx) => (
          <div key={country.code}>
            {idx > 0 && <SidebarSeparator />}
            <SidebarGroup>
              <SidebarGroupLabel className="text-[11px] font-semibold tracking-[0.12em] uppercase text-foreground/50">
                {country.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {CATEGORIES.map(({ id, label, Icon }) => (
                    <CategoryMenuItem
                      key={id}
                      countryCode={country.code}
                      categoryId={id}
                      label={label}
                      Icon={Icon}
                      isActive={activeCountry === country.code && activeCategory === id}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
