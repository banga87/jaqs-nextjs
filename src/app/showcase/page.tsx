"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FormInput,
  Table as TableIcon,
  MessageSquare,
  MousePointerClick,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trash2,
  Settings,
  Menu,
  Bell,
  User,
  Mail,
  ChevronsUpDown,
  Calculator,
  Calendar,
  CreditCard,
  Smile,
  Copy,
  Share,
  Pencil,
  FileText,
  MoreHorizontal,
  Keyboard,
  Github,
  ExternalLink,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

// Demo Zod schema for form validation
const demoFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(200, "Bio must be less than 200 characters"),
  preference: z.string().min(1, "Please select a preference"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  contactMethod: z.enum(["email", "phone", "both"], {
    message: "Please select a contact method",
  }),
  notifications: z.boolean(),
});

type DemoFormValues = z.infer<typeof demoFormSchema>;

const interestOptions = [
  { id: "technology", label: "Technology" },
  { id: "design", label: "Design" },
  { id: "business", label: "Business" },
  { id: "marketing", label: "Marketing" },
] as const;

function DemoForm() {
  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      preference: "",
      interests: [],
      contactMethod: undefined,
      notifications: false,
    },
  });

  function onSubmit(data: DemoFormValues) {
    toast.success("Form submitted successfully!", {
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-auto">
          <code className="text-white text-xs">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormDescription>We will never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio Field */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a bit about yourself..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Brief description about yourself (10-200 characters).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preference Select */}
        <FormField
          control={form.control}
          name="preference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="frontend">Frontend Development</SelectItem>
                  <SelectItem value="backend">Backend Development</SelectItem>
                  <SelectItem value="fullstack">Full Stack Development</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Your area of expertise.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Interests Checkbox Group */}
        <FormField
          control={form.control}
          name="interests"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Interests</FormLabel>
                <FormDescription>Select all that apply.</FormDescription>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {interestOptions.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="interests"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Method RadioGroup */}
        <FormField
          control={form.control}
          name="contactMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Preferred Contact Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="email" />
                    </FormControl>
                    <FormLabel className="font-normal">Email</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="phone" />
                    </FormControl>
                    <FormLabel className="font-normal">Phone</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="both" />
                    </FormControl>
                    <FormLabel className="font-normal">Both</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notifications Switch */}
        <FormField
          control={form.control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Email Notifications</FormLabel>
                <FormDescription>
                  Receive notifications about new features and updates.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// Data Table Demo Component with sorting and filtering
function DataTableDemo() {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filterValue, setFilterValue] = useState("");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUp className="h-4 w-4 ml-1" />;
    }
    return <ArrowDown className="h-4 w-4 ml-1" />;
  };

  const filteredAndSortedData = [...mockTableData]
    .filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField || !sortDirection) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Table with Sorting & Filtering</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click column headers to sort. Use the filter input to search by name.
        </p>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filter by name..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="max-w-sm"
          />
          {filterValue && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilterValue("")}
            >
              Clear
            </Button>
          )}
        </div>
        <Table>
          <TableCaption>A list of users with their status and registration date.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                <span className="flex items-center">
                  Name
                  {getSortIcon("name")}
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("email")}
              >
                <span className="flex items-center">
                  Email
                  {getSortIcon("email")}
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("status")}
              >
                <span className="flex items-center">
                  Status
                  {getSortIcon("status")}
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("date")}
              >
                <span className="flex items-center">
                  Date
                  {getSortIcon("date")}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedData.length} of {mockTableData.length} results
        </div>
      </CardContent>
    </Card>
  );
}

// Collapsible Demo Component
function CollapsibleDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Collapsible</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Collapsible is a simple component that can toggle the visibility of content. Click the button to expand or collapse.
        </p>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4">
            <h4 className="text-sm font-semibold">
              @peduarte starred 3 repositories
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            @radix-ui/primitives
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
              @radix-ui/colors
            </div>
            <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
              @stitches/react
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

// Dropdown Menu Demo Component
function DropdownMenuDemo() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [position, setPosition] = useState("bottom");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Dropdown Menu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Dropdown menus display a list of choices on temporary surfaces. They support items, separators, checkbox items, and radio groups.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreHorizontal className="mr-2 h-4 w-4" />
              Open Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
                <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
                <DropdownMenuShortcut>Ctrl+B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
                <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Panel
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Current state:</span>{" "}
          Status Bar: {showStatusBar ? "On" : "Off"},{" "}
          Activity Bar: {showActivityBar ? "On" : "Off"},{" "}
          Panel: {showPanel ? "On" : "Off"},{" "}
          Position: {position}
        </div>
      </CardContent>
    </Card>
  );
}

// Command Palette Demo Component
function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Command Palette</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Command palettes provide a fast way to search and execute commands. Press{" "}
          <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Ctrl+K</kbd>{" "}
          or click the button below to open.
        </p>
        <div className="flex flex-col gap-4">
          <Button variant="outline" onClick={() => setOpen(true)} className="w-fit">
            <span className="mr-2">Open Command Palette</span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">Ctrl</span>K
            </kbd>
          </Button>

          {/* Inline Command Demo */}
          <div className="border rounded-lg">
            <Command className="rounded-lg border-0">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    Calendar
                  </CommandItem>
                  <CommandItem>
                    <Smile className="mr-2 h-4 w-4" />
                    Search Emoji
                  </CommandItem>
                  <CommandItem>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculator
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                    <CommandShortcut>Ctrl+P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                    <CommandShortcut>Ctrl+B</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                    <CommandShortcut>Ctrl+S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setOpen(false)}>
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Smile className="mr-2 h-4 w-4" />
                Search Emoji
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Calculator className="mr-2 h-4 w-4" />
                Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setOpen(false)}>
                <User className="mr-2 h-4 w-4" />
                Profile
                <CommandShortcut>Ctrl+P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
                <CommandShortcut>Ctrl+B</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
                <CommandShortcut>Ctrl+S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </CardContent>
    </Card>
  );
}

// Loading State Demo Component
function LoadingStateDemo() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Loading State Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Toggle between loading and loaded states to see the skeleton in action.
        </p>
        <div className="flex items-center gap-4">
          <Switch
            id="loading-toggle"
            checked={isLoading}
            onCheckedChange={setIsLoading}
          />
          <Label htmlFor="loading-toggle">
            {isLoading ? "Loading..." : "Loaded"}
          </Label>
        </div>
        <Separator />
        <div className="border rounded-lg p-4">
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[75%]" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 w-[100px]" />
                <Skeleton className="h-9 w-[80px]" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
              <div className="flex gap-2 pt-2">
                <Button size="sm">View Profile</Button>
                <Button size="sm" variant="outline">Message</Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Mock data for table demo
interface TableUser {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  date: string;
}

const mockTableData: TableUser[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "active", date: "2024-01-15" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "inactive", date: "2024-02-20" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", status: "pending", date: "2024-01-10" },
  { id: "4", name: "Diana Ross", email: "diana@example.com", status: "active", date: "2024-03-05" },
  { id: "5", name: "Edward Norton", email: "edward@example.com", status: "active", date: "2024-02-28" },
  { id: "6", name: "Fiona Apple", email: "fiona@example.com", status: "pending", date: "2024-01-22" },
  { id: "7", name: "George Lucas", email: "george@example.com", status: "inactive", date: "2024-03-12" },
  { id: "8", name: "Hannah Montana", email: "hannah@example.com", status: "active", date: "2024-02-14" },
];

type SortDirection = "asc" | "desc" | null;
type SortField = keyof TableUser;

function getStatusBadgeVariant(status: TableUser["status"]) {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "destructive";
    case "pending":
      return "warning";
    default:
      return "default";
  }
}

const sections = [
  { id: "forms", label: "Forms", icon: FormInput },
  { id: "data-display", label: "Data Display", icon: TableIcon },
  { id: "feedback-overlays", label: "Feedback & Overlays", icon: MessageSquare },
  { id: "interactive-elements", label: "Interactive Elements", icon: MousePointerClick },
];

export default function ShowcasePage() {
  const [activeSection, setActiveSection] = useState<string>("forms");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      for (const { id, element } of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/plans">
              <ArrowLeft className="h-4 w-4" />
              Back to Plans
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold">UI Component Showcase</h1>
        <p className="text-muted-foreground mt-2">
          A comprehensive collection of shadcn/ui components demonstrating the design system used in this application.
        </p>
      </div>


      <Separator className="mb-8" />

      {/* Mobile Navigation - visible only on small screens */}
      <div className="lg:hidden mb-6">
        <Select value={activeSection} onValueChange={scrollToSection}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Jump to section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <SelectItem key={section.id} value={section.id}>
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-8">
        {/* Sidebar - hidden on mobile */}
        <aside className="hidden lg:block w-[250px] shrink-0">
          <nav className="sticky top-8">
            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="space-y-12">
            {/* Forms Section */}
            <section id="forms" className="scroll-mt-8">
              <div className="space-y-6">
                {/* Section Header */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FormInput className="h-5 w-5" />
                      Forms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Form components including inputs, selects, checkboxes, radio buttons, switches, and a complete validated form demo.
                    </p>
                  </CardContent>
                </Card>

                {/* Input Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Input</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Default Input</Label>
                        <Input type="text" />
                      </div>
                      <div className="space-y-2">
                        <Label>With Placeholder</Label>
                        <Input type="text" placeholder="Enter your name..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Disabled Input</Label>
                        <Input type="text" placeholder="Disabled" disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>With Error State</Label>
                        <Input type="text" placeholder="Invalid input" aria-invalid="true" />
                        <p className="text-sm text-destructive">This field has an error</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Email Input</Label>
                        <Input type="email" placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Password Input</Label>
                        <Input type="password" placeholder="Enter password" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Textarea Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Textarea</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Default Textarea</Label>
                        <Textarea placeholder="Type your message here..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Disabled Textarea</Label>
                        <Textarea placeholder="This textarea is disabled" disabled />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>With Character Count</Label>
                        <span className="text-sm text-muted-foreground">0/200</span>
                      </div>
                      <Textarea placeholder="Write your bio (max 200 characters)..." maxLength={200} />
                    </div>
                  </CardContent>
                </Card>

                {/* Select Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Select</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Single Select</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Disabled Select</Label>
                        <Select disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Disabled" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Theme Preference</Label>
                      <Select defaultValue="system">
                        <SelectTrigger className="w-full md:w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Checkbox Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Checkbox</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Accept terms and conditions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="disabled-checkbox" disabled />
                        <Label htmlFor="disabled-checkbox" className="opacity-50">Disabled checkbox</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="checked-disabled" disabled defaultChecked />
                        <Label htmlFor="checked-disabled" className="opacity-50">Checked and disabled</Label>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <Label>Checkbox Group (Select your interests)</Label>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="interest-tech" />
                          <Label htmlFor="interest-tech">Technology</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="interest-design" />
                          <Label htmlFor="interest-design">Design</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="interest-business" />
                          <Label htmlFor="interest-business">Business</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="interest-marketing" />
                          <Label htmlFor="interest-marketing">Marketing</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* RadioGroup Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Radio Group</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-3">
                        <Label>Vertical Layout</Label>
                        <RadioGroup defaultValue="option1">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option1" id="v-option1" />
                            <Label htmlFor="v-option1">Option 1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option2" id="v-option2" />
                            <Label htmlFor="v-option2">Option 2</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option3" id="v-option3" />
                            <Label htmlFor="v-option3">Option 3</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-3">
                        <Label>Horizontal Layout</Label>
                        <RadioGroup defaultValue="small" className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="small" id="h-small" />
                            <Label htmlFor="h-small">Small</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="h-medium" />
                            <Label htmlFor="h-medium">Medium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="large" id="h-large" />
                            <Label htmlFor="h-large">Large</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <Label>Contact Preference</Label>
                      <RadioGroup defaultValue="email">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="contact-email" />
                          <Label htmlFor="contact-email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phone" id="contact-phone" />
                          <Label htmlFor="contact-phone">Phone</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="contact-both" />
                          <Label htmlFor="contact-both">Both</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>

                {/* Switch Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Switch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Default Switch</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>With Label and Description</Label>
                          <p className="text-sm text-muted-foreground">Enable notifications for updates</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="opacity-50">Disabled Switch</Label>
                        <Switch disabled />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="opacity-50">Disabled and Checked</Label>
                        <Switch disabled defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Complete Demo Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Complete Form Demo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DemoForm />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Data Display Section */}
            <section id="data-display" className="scroll-mt-8">
              <div className="space-y-6">
                {/* Section Header */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TableIcon className="h-5 w-5" />
                      Data Display
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Components for displaying data including tables with sorting and filtering, badges, avatars, progress bars, and skeleton loaders.
                    </p>
                  </CardContent>
                </Card>

                {/* Table with Sorting and Filtering */}
                <DataTableDemo />

                {/* Badge Variants */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Badge</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Badges are used to highlight status, categories, or labels. Available in 6 variants.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex flex-col items-center gap-2">
                        <Badge variant="default">Default</Badge>
                        <span className="text-xs text-muted-foreground">default</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Badge variant="secondary">Secondary</Badge>
                        <span className="text-xs text-muted-foreground">secondary</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Badge variant="destructive">Destructive</Badge>
                        <span className="text-xs text-muted-foreground">destructive</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Badge variant="outline">Outline</Badge>
                        <span className="text-xs text-muted-foreground">outline</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Badge variant="success">Success</Badge>
                        <span className="text-xs text-muted-foreground">success</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Badge variant="warning">Warning</Badge>
                        <span className="text-xs text-muted-foreground">warning</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Avatar Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Avatar</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                      Avatars display user profile images with fallback initials when images are unavailable.
                    </p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>With Image</Label>
                        <div className="flex gap-4 items-center">
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">Loads external image with fallback</span>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>With Fallback Initials</Label>
                        <div className="flex gap-4 items-center">
                          <Avatar>
                            <AvatarImage src="/broken-image.jpg" alt="John Doe" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <Avatar>
                            <AvatarFallback>AB</AvatarFallback>
                          </Avatar>
                          <Avatar>
                            <AvatarFallback>XY</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">Shows initials when image fails</span>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Different Sizes</Label>
                        <div className="flex gap-4 items-end">
                          <div className="flex flex-col items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">SM</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">Small</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <Avatar>
                              <AvatarFallback>MD</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">Default</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback>LG</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">Large</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="text-lg">XL</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">Extra Large</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Bar Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                      Progress bars indicate completion status of tasks or operations.
                    </p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>25% Complete</span>
                          <span className="text-muted-foreground">25%</span>
                        </div>
                        <Progress value={25} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>50% Complete</span>
                          <span className="text-muted-foreground">50%</span>
                        </div>
                        <Progress value={50} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>75% Complete</span>
                          <span className="text-muted-foreground">75%</span>
                        </div>
                        <Progress value={75} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>100% Complete</span>
                          <span className="text-muted-foreground">100%</span>
                        </div>
                        <Progress value={100} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skeleton Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skeleton</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                      Skeleton loaders provide visual feedback while content is loading.
                    </p>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-3">
                        <Label>Text Skeleton</Label>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-[80%]" />
                          <Skeleton className="h-4 w-[60%]" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label>Avatar Skeleton</Label>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-3 w-[100px]" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label>Card Skeleton</Label>
                        <div className="border rounded-lg p-4 space-y-3">
                          <Skeleton className="h-5 w-[40%]" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-[90%]" />
                          <Skeleton className="h-8 w-[100px] mt-2" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label>Table Row Skeleton</Label>
                        <div className="border rounded-lg overflow-hidden">
                          <div className="border-b p-3 flex gap-4">
                            <Skeleton className="h-4 w-[30%]" />
                            <Skeleton className="h-4 w-[40%]" />
                            <Skeleton className="h-4 w-[20%]" />
                          </div>
                          <div className="border-b p-3 flex gap-4">
                            <Skeleton className="h-4 w-[30%]" />
                            <Skeleton className="h-4 w-[40%]" />
                            <Skeleton className="h-4 w-[20%]" />
                          </div>
                          <div className="p-3 flex gap-4">
                            <Skeleton className="h-4 w-[30%]" />
                            <Skeleton className="h-4 w-[40%]" />
                            <Skeleton className="h-4 w-[20%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Loading State Demo */}
                <LoadingStateDemo />
              </div>
            </section>

            {/* Feedback & Overlays Section */}
            <section id="feedback-overlays" className="scroll-mt-8">
              <div className="space-y-6">
                {/* Section Header */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Feedback & Overlays
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Feedback components including dialogs, alert dialogs, sheets, toasts, tooltips, and popovers for user interaction and notifications.
                    </p>
                  </CardContent>
                </Card>

                {/* Dialog Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dialog</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Dialogs are modal windows that appear on top of the main content. Use them for forms, confirmations, or important information.
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <User className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dialog-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="dialog-name"
                              defaultValue="John Doe"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dialog-username" className="text-right">
                              Username
                            </Label>
                            <Input
                              id="dialog-username"
                              defaultValue="@johndoe"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dialog-email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="dialog-email"
                              type="email"
                              defaultValue="john@example.com"
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={() => toast.success("Profile updated successfully!")}>
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                {/* Alert Dialog Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Alert Dialog</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Alert dialogs interrupt the user with important content and expect a response. Use them for destructive actions or critical confirmations.
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Item
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            item and remove all associated data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => toast.success("Item deleted successfully!")}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>

                {/* Sheet Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sheet</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Sheets are slide-over panels that extend from the edge of the screen. Useful for navigation, settings, or additional content.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {/* Left Sheet */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline">
                            <Menu className="h-4 w-4 mr-2" />
                            Open Left Sheet
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                          <SheetHeader>
                            <SheetTitle>Navigation Menu</SheetTitle>
                            <SheetDescription>
                              Browse through the main navigation sections.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="py-4 space-y-4">
                            <nav className="space-y-2">
                              {["Dashboard", "Profile", "Settings", "Notifications", "Help & Support"].map((item) => (
                                <Button key={item} variant="ghost" className="w-full justify-start">
                                  {item}
                                </Button>
                              ))}
                            </nav>
                          </div>
                          <SheetFooter>
                            <Button variant="outline" className="w-full">
                              Log out
                            </Button>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>

                      {/* Right Sheet */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            Open Right Sheet
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                          <SheetHeader>
                            <SheetTitle>Settings</SheetTitle>
                            <SheetDescription>
                              Adjust your application preferences here.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="py-4 space-y-6">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">Enable dark theme</p>
                              </div>
                              <Switch />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive push notifications</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Email Digest</Label>
                                <p className="text-sm text-muted-foreground">Weekly email summary</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                          <SheetFooter>
                            <Button className="w-full" onClick={() => toast.success("Settings saved!")}>
                              Save Settings
                            </Button>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </CardContent>
                </Card>

                {/* Toast Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Toast Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Toast notifications provide brief messages about app processes. Available in success, error, warning, info, and promise variants.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        onClick={() => toast.success("Operation completed successfully!")}
                      >
                        Success Toast
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => toast.error("Something went wrong. Please try again.")}
                      >
                        Error Toast
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => toast.warning("Please review your input before proceeding.")}
                      >
                        Warning Toast
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => toast.info("New features are available. Check them out!")}
                      >
                        Info Toast
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          toast.promise(
                            new Promise((resolve) => setTimeout(resolve, 2000)),
                            {
                              loading: "Saving changes...",
                              success: "Changes saved successfully!",
                              error: "Failed to save changes.",
                            }
                          );
                        }}
                      >
                        Promise Toast
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Tooltip Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tooltip</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Tooltips display informative text when users hover over an element. Available in different positions.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center py-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Hover (Top)</Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Tooltip on top</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Hover (Bottom)</Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Tooltip on bottom</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Hover (Left)</Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Tooltip on left</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Hover (Right)</Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Tooltip on right</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Icon Tooltips</Label>
                      <div className="flex gap-4">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Bell className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Notifications</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Settings</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <User className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Profile</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Messages</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Popover Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Popover</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Popovers display rich content in a portal, triggered by a button click. Useful for forms, menus, or additional information.
                    </p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          <Bell className="h-4 w-4 mr-2" />
                          Update Notifications
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Notification Settings</h4>
                            <p className="text-sm text-muted-foreground">
                              Configure how you receive notifications.
                            </p>
                          </div>
                          <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="popover-email">Email</Label>
                              <Switch id="popover-email" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="popover-push">Push</Label>
                              <Switch id="popover-push" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="popover-sms">SMS</Label>
                              <Switch id="popover-sms" />
                            </div>
                          </div>
                          <Button size="sm" onClick={() => toast.success("Notification preferences saved!")}>
                            Save preferences
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </CardContent>
                </Card>

                {/* Grid Layout of All Overlay Triggers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Overlay Trigger Grid</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      A convenient grid of all overlay component triggers for quick testing.
                    </p>
                    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                      {/* Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-20 flex-col gap-2">
                            <User className="h-5 w-5" />
                            <span className="text-xs">Dialog</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Dialog Example</DialogTitle>
                            <DialogDescription>This is a dialog triggered from the grid.</DialogDescription>
                          </DialogHeader>
                          <p className="text-sm text-muted-foreground">Dialog content goes here.</p>
                          <DialogFooter>
                            <Button variant="outline">Close</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Alert Dialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="h-20 flex-col gap-2">
                            <Trash2 className="h-5 w-5" />
                            <span className="text-xs">Alert Dialog</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                            <AlertDialogDescription>
                              This is an alert dialog triggered from the grid.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      {/* Left Sheet */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" className="h-20 flex-col gap-2">
                            <Menu className="h-5 w-5" />
                            <span className="text-xs">Sheet (Left)</span>
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                          <SheetHeader>
                            <SheetTitle>Left Sheet</SheetTitle>
                            <SheetDescription>Triggered from the grid.</SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>

                      {/* Right Sheet */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" className="h-20 flex-col gap-2">
                            <Settings className="h-5 w-5" />
                            <span className="text-xs">Sheet (Right)</span>
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                          <SheetHeader>
                            <SheetTitle>Right Sheet</SheetTitle>
                            <SheetDescription>Triggered from the grid.</SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>

                      {/* Success Toast */}
                      <Button
                        variant="outline"
                        className="h-20 flex-col gap-2"
                        onClick={() => toast.success("Success!")}
                      >
                        <Badge variant="success" className="h-5 px-2">OK</Badge>
                        <span className="text-xs">Success Toast</span>
                      </Button>

                      {/* Error Toast */}
                      <Button
                        variant="outline"
                        className="h-20 flex-col gap-2"
                        onClick={() => toast.error("Error!")}
                      >
                        <Badge variant="destructive" className="h-5 px-2">!</Badge>
                        <span className="text-xs">Error Toast</span>
                      </Button>

                      {/* Popover */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="h-20 flex-col gap-2">
                            <Bell className="h-5 w-5" />
                            <span className="text-xs">Popover</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <p className="text-sm">Popover triggered from grid.</p>
                        </PopoverContent>
                      </Popover>

                      {/* Tooltip */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" className="h-20 flex-col gap-2">
                            <MessageSquare className="h-5 w-5" />
                            <span className="text-xs">Tooltip</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Tooltip from grid!</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Interactive Elements Section */}
            <section id="interactive-elements" className="scroll-mt-8">
              <div className="space-y-6">
                {/* Section Header */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MousePointerClick className="h-5 w-5" />
                      Interactive Elements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Interactive layout components including Tabs, Accordion, Collapsible, Dropdown Menu, Context Menu, and Command palette for complex interaction patterns.
                    </p>
                  </CardContent>
                </Card>

                {/* Tabs Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tabs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Tabs organize content into separate views where only one view is visible at a time. Click tabs to switch content.
                    </p>
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="space-y-4 pt-4">
                        <div className="border rounded-lg p-4 space-y-3">
                          <h4 className="font-medium">Project Overview</h4>
                          <p className="text-sm text-muted-foreground">
                            Welcome to your project dashboard. Here you can see a summary of your project&apos;s status, recent activities, and key metrics at a glance.
                          </p>
                          <div className="grid grid-cols-3 gap-4 pt-2">
                            <div className="text-center p-3 bg-muted rounded-md">
                              <div className="text-2xl font-bold">24</div>
                              <div className="text-xs text-muted-foreground">Active Tasks</div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-md">
                              <div className="text-2xl font-bold">8</div>
                              <div className="text-xs text-muted-foreground">Team Members</div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-md">
                              <div className="text-2xl font-bold">92%</div>
                              <div className="text-xs text-muted-foreground">Completion</div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="analytics" className="space-y-4 pt-4">
                        <div className="border rounded-lg p-4 space-y-3">
                          <h4 className="font-medium">Analytics Dashboard</h4>
                          <p className="text-sm text-muted-foreground">
                            Track your project&apos;s performance with detailed analytics. View trends, identify bottlenecks, and optimize your workflow.
                          </p>
                          <div className="space-y-2 pt-2">
                            <div className="flex justify-between text-sm">
                              <span>Page Views</span>
                              <span className="font-medium">12,543</span>
                            </div>
                            <Progress value={75} />
                            <div className="flex justify-between text-sm pt-2">
                              <span>Conversions</span>
                              <span className="font-medium">1,234</span>
                            </div>
                            <Progress value={45} />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="settings" className="space-y-4 pt-4">
                        <div className="border rounded-lg p-4 space-y-4">
                          <h4 className="font-medium">Project Settings</h4>
                          <p className="text-sm text-muted-foreground">
                            Configure your project settings and preferences.
                          </p>
                          <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label>Email Notifications</Label>
                                <p className="text-xs text-muted-foreground">Receive email updates</p>
                              </div>
                              <Switch />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                              <div>
                                <Label>Public Project</Label>
                                <p className="text-xs text-muted-foreground">Make project visible to everyone</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Accordion Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Accordion</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Accordions display a list of expandable items. Click an item header to expand or collapse its content. Only one item can be open at a time.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
                        <AccordionContent>
                          shadcn/ui is a collection of beautifully designed, accessible, and customizable React components. Unlike traditional component libraries, it provides copy-paste components that you own and can modify to fit your needs.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How do I install components?</AccordionTrigger>
                        <AccordionContent>
                          You can install components using the CLI by running <code className="bg-muted px-1.5 py-0.5 rounded text-sm">npx shadcn@latest add [component]</code>. This will add the component files directly to your project, giving you full control over the code.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Can I customize the styling?</AccordionTrigger>
                        <AccordionContent>
                          Absolutely! Since the components are added directly to your project, you have complete control over their styling. Components use Tailwind CSS and CSS variables, making customization straightforward and consistent.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                          Yes, all shadcn/ui components are built on top of Radix UI primitives, which are designed with accessibility in mind. They include proper ARIA attributes, keyboard navigation, and focus management out of the box.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Collapsible Example */}
                <CollapsibleDemo />

                {/* Dropdown Menu Example */}
                <DropdownMenuDemo />

                {/* Context Menu Example */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Context Menu</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Context menus appear when you right-click on an element. Right-click on the area below to see the context menu.
                    </p>
                    <ContextMenu>
                      <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                        Right-click here for context menu
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-64">
                        <ContextMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                          <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                          <ContextMenuShortcut>Ctrl+E</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          Share
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuLabel>More Options</ContextMenuLabel>
                        <ContextMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </ContextMenuItem>
                        <ContextMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem variant="destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                          <ContextMenuShortcut>Del</ContextMenuShortcut>
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </CardContent>
                </Card>

                {/* Command Palette Example */}
                <CommandPaletteDemo />

                {/* Keyboard Navigation Hints */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Keyboard className="h-5 w-5" />
                      Keyboard Navigation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      All interactive components support keyboard navigation for accessibility. Here are common keyboard shortcuts:
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="border rounded-lg p-4 space-y-3">
                        <h4 className="font-medium text-sm">General Navigation</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Move focus forward</span>
                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Tab</kbd>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Move focus backward</span>
                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Shift + Tab</kbd>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Activate/Select</span>
                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Enter</kbd>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Close/Cancel</span>
                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Escape</kbd>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 space-y-3">
                        <h4 className="font-medium text-sm">Within Components</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Navigate up</span>
                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Arrow Up</kbd>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Navigate down</span>
                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Arrow Down</kbd>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Navigate left/right</span>
                            <div className="flex gap-1">
                              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Arrow Left</kbd>
                              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Arrow Right</kbd>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Toggle selection</span>
                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Space</kbd>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 space-y-3">
                      <h4 className="font-medium text-sm">Component-Specific Shortcuts</h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Open command palette</span>
                          <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Ctrl + K</kbd>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Tabs: Switch tabs</span>
                          <div className="flex gap-1">
                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Arrow Left</kbd>
                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Arrow Right</kbd>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">First/Last item</span>
                          <div className="flex gap-1">
                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Home</kbd>
                            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">End</kbd>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Select matching item</span>
                          <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Type to search</kbd>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Separator className="my-8" />
      <footer className="pb-8 text-center text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span>Built with shadcn/ui components</span>
          <a
            href="https://github.com/shadcn-ui/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
          >
            <Github className="h-4 w-4" />
            View shadcn/ui on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </footer>
    </div>
  );
}
