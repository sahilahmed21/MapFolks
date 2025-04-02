// app/settings/page.tsx
"use client";

import React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center mb-6">
                <SettingsIcon className="mr-2 h-6 w-6 text-custom-primary" />
                <h1 className="text-2xl font-bold text-custom-primary">Settings</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Settings */}
                <Card className="border-custom-secondary">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-custom-primary">Account</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm text-muted-foreground">
                                Username
                            </Label>
                            <Input id="username" defaultValue="johndoe" className="bg-custom-background border-custom-secondary text-custom-primary" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm text-muted-foreground">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue="john.doe@example.com"
                                className="bg-custom-background border-custom-secondary text-custom-primary"
                            />
                        </div>
                        <div>
                            <Button variant="outline" className="border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background">
                                Update Account
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance Settings */}
                <Card className="border-custom-secondary">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-custom-primary">Appearance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="theme" className="text-sm text-muted-foreground">
                                Dark Mode
                            </Label>
                            <Switch id="theme" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="language" className="text-sm text-muted-foreground">
                                Language
                            </Label>
                            <Input id="language" defaultValue="English" className="bg-custom-background border-custom-secondary text-custom-primary" />
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="border-custom-secondary">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-custom-primary">Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="emailNotifications" className="text-sm text-muted-foreground">
                                Email Notifications
                            </Label>
                            <Switch id="emailNotifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="pushNotifications" className="text-sm text-muted-foreground">
                                Push Notifications
                            </Label>
                            <Switch id="pushNotifications" />
                        </div>
                    </CardContent>
                </Card>

                {/* Add more settings sections here */}
                <Card className="border-custom-secondary">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-custom-primary">Privacy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">Manage your privacy settings.</p>
                        <div>
                            <Button variant="outline" className="border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background">
                                Manage Privacy
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SettingsPage;