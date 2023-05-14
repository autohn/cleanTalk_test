import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { useMainStore, FormData } from "./store";

export default function CoordinatesForm() {
  const store = useMainStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      PointA: store.formData.PointA,
      PointB: store.formData.PointB,
      PointC: store.formData.PointC,
    },
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    store.setFormData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      {["A", "B", "C"].map((point) => (
        <fieldset key={point} className="p-4 border border-gray-200 rounded-md">
          <legend
            className={
              point == "A"
                ? "text-red-500 font-semibold text-lg"
                : point == "B"
                ? "text-green-500 font-semibold text-lg"
                : point == "C"
                ? "text-blue-500 font-semibold text-lg"
                : ""
            }
          >
            Point {point}
          </legend>
          <div className="flex space-x-4">
            <label className="flex flex-col">
              Latitude:
              <input
                type="number"
                step="0.0000001"
                {...register(`Point${point}.latitude`, {
                  required: "Required",
                  min: {
                    value: -90,
                    message: "Minimum latitude is -90",
                  },
                  max: {
                    value: 90,
                    message: "Maximum latitude is 90",
                  },
                  valueAsNumber: true,
                })}
                className="border border-gray-200 rounded p-2"
              />
              {(errors[`Point${point}`] as FieldErrors<FormData>)?.latitude && (
                <p className="text-red-500 text-sm">
                  {(errors[`Point${point}`] as any)?.latitude?.message}
                </p>
              )}
            </label>

            <label className="flex flex-col">
              Longitude:
              <input
                type="number"
                step="0.0000001"
                {...register(`Point${point}.longitude`, {
                  required: "Required",
                  min: {
                    value: -180,
                    message: "Minimum longitude is -180",
                  },
                  max: {
                    value: 180,
                    message: "Maximum longitude is 180",
                  },
                  valueAsNumber: true,
                })}
                className="border border-gray-200 rounded p-2"
              />
              {(errors[`Point${point}`] as FieldErrors<FormData>)
                ?.longitude && (
                <p className="text-red-500 text-sm">
                  {(errors[`Point${point}`] as any)?.longitude?.message}
                </p>
              )}
            </label>

            <label className="flex flex-col">
              Dist m:
              <input
                type="number"
                step="0.0000001"
                {...register(`Point${point}.distance`, {
                  required: "Required",
                  min: {
                    value: 0,
                    message: "Minimum distance is 0m",
                  },
                  max: {
                    value: 100000000,
                    message: "Maximum distance is 1000000m",
                  },
                  valueAsNumber: true,
                })}
                className="border border-gray-200 rounded p-2"
              />
              {(errors[`Point${point}`] as FieldErrors<FormData>)?.distance && (
                <p className="text-red-500 text-sm">
                  {(errors[`Point${point}`] as any)?.distance?.message}
                </p>
              )}
            </label>
          </div>
        </fieldset>
      ))}

      <input
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
      />
    </form>
  );
}
