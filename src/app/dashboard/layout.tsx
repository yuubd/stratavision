"use client";

import type * as React from "react";
import { VerticalLayout } from "@/components/dashboard/layout/vertical/vertical-layout";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout(props: LayoutProps): React.JSX.Element {
	return <VerticalLayout {...props} />;
}
