import type { RequestPayload } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import { clsx, type ClassValue } from "clsx";
import { Path, UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function inertiaFormHandler<T extends RequestPayload, U extends UseFormReturn<T>>(values: T, routeName: string, form: U) {
    router.post(route(routeName), values, {
        onError: (e) => {
            for (const key in e) {
                const message = e[key];

                form.setError(key as Path<T>, {
                    message,
                });
            }
        },
    });
}
