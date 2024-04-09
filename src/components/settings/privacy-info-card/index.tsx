import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, Fingerprint, Shield } from "lucide-react";
import Link from "next/link";

const PrivacyInfoCard = () => {
  return (
    <Card className="mt-4 w-full">
      <CardContent className="space-y-4 py-4">
        <div className="flex items-start space-x-4">
          <div className="space-y-1">
            <Shield className="h-auto w-12" color="#E31C5F" />
            <h3 className="text-lg font-semibold">
              Does my data appear when I make a report?
            </h3>
            <p className="text-sm text-gray-500">
              Your personal data remains secure at all times. The report does
              not include your name, email, or photo.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="space-y-1">
            <Fingerprint className="h-auto w-12" color="#E31C5F" />
            <h3 className="text-lg font-semibold">
              Does EchoSafe use my data?
            </h3>
            <p className="text-sm text-gray-500">
              EchoSafe only provides profile customization so that you feel at
              home in this application. We do not use your data nor make them
              public at any time.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="space-y-1">
            <Eye className="h-auto w-12" color="#E31C5F" />
            <h3 className="text-lg font-semibold">
              What information is public to the school?
            </h3>
            <p className="text-sm text-gray-500">
              Only your school year and class. We do not send any other
              information from your profile.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild className="w-full" variant="outline">
          <Link href="/privacy-policy">Learn more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PrivacyInfoCard;
