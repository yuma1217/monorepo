"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

const distanceSchema = z.number().min(0).max(100, "100kmまでです");
const schema = z.object({
  isDistanceSearch: z.boolean(),
  fromHereDistance: distanceSchema,
});
type FormValues = z.infer<typeof schema>;

export default function SearchForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      isDistanceSearch: false,
      fromHereDistance: 0,
    },
  });
  const isDistanceSearch = form.useStore(
    (state) => state.values.isDistanceSearch
  );
  return (
    <Card className="mx-auto max-w-xs">
      <CardHeader>
        <CardTitle className="text-2xl">エリア</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form.Field name="isDistanceSearch">
            {(field) => (
              <div className="flex items-center justify-between">
                <Label htmlFor="isDistanceSearch" className="text-lg">
                  距離で検索
                </Label>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
              </div>
            )}
          </form.Field>
          <form.Field
            name="fromHereDistance"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: distanceSchema,
            }}
          >
            {(field) => (
              <div
                className={
                  isDistanceSearch ? "grid gap-4" : "grid gap-4 opacity-50"
                }
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="fromHereDistance" className="text-lg">
                    現在地から
                  </Label>
                  <p className="text-lg">{field.state.value}km</p>
                </div>
                <Slider
                  max={200}
                  defaultValue={[50]}
                  disabled={false}
                  value={[field.state.value]}
                  onValueChange={(value) => field.handleChange(value[0])}
                />
                {field.state.meta.errors.map((err, index) => (
                  <div key={index}>{err}</div>
                ))}
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitted]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="w-full"
                onClick={() => {}}
                disabled={!canSubmit}
              >
                検索する
              </Button>
            )}
          </form.Subscribe>
        </div>
      </CardContent>
    </Card>
  );
}
