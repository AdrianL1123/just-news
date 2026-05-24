import { Link, useParams } from '@tanstack/react-router'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { COUNTRIES, CATEGORIES } from '@/config/nav'

export function AppSidebar() {
  const { country: activeCountry, category: activeCategory } = useParams({
    strict: false,
  })

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
                  {CATEGORIES.map(({ id, label, Icon }) => {
                    const isActive =
                      activeCountry === country.code && activeCategory === id
                    return (
                      <SidebarMenuItem key={id}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link
                            to="/$country/$category"
                            params={{ country: country.code, category: id }}
                          >
                            <Icon />
                            <span>{label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
