import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getUserScheduledAppointments } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";



const ViewAppointments = async ({ params }: { params: { userId: string } }) => {
  const appointments = await getUserScheduledAppointments(params.userId);

  return (
    <div className="mx-auto min-h-screen max-w-3xl space-y-8 p-6">
      <h1 className="text-center text-3xl font-bold">Your Scheduled Appointments</h1>

      {appointments?.length === 0 ? (
        <> 
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </>
      ) : (
        <ul className="space-y-6">
          {appointments.map((appt: any) => (
            <li
              key={appt.$id}
              className="flex flex-col gap-2 rounded-xl border p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-semibold text-gray-100">
                  {formatDateTime(appt.schedule).dateTime}
                </span>
              </div>
              <p className="text-white">
                <span className="font-medium">Doctor:</span> {appt.primaryPhysician}
              </p>
              <p className="text-white">
                <span className="font-medium">Reason:</span> {appt.reason}
              </p>
              {appt.note && (
                <p className="text-white">
                  <span className="font-medium">Note:</span> {appt.note}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center">
        <Link href={`/patients/${params.userId}/new-appointment`}>
          <Button className="shad-primary-btn">Book Another Appointment</Button>
        </Link>
      </div>
    </div>
  );
};

export default ViewAppointments;
