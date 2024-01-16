import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/lib/components/ui/TabsVertical";

export function TokenSettings() {
  return (
    <Tabs className="grid col-span-3 sm:col-span-4 md:grid-cols-5 lg:grid-cols-6 h-[calc(100vh-110px)]">
      <div className="col-span-1 border-r border-highlight pt-8 px-6 min-w-[25%] xl:min-w-[10%]">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="guard">Guard</TabsTrigger>
          <TabsTrigger value="extensions">Extensions</TabsTrigger>
        </TabsList>
      </div>
      <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 pt-8 px-6">
        <TabsContent value="general">General</TabsContent>
        <TabsContent value="permissions">Permissions</TabsContent>
        <TabsContent value="guard">Guard</TabsContent>
        <TabsContent value="extensions">Extensions</TabsContent>
      </div>
    </Tabs>
  );
}
