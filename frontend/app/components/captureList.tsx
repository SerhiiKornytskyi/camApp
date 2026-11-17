import { CaptureData } from "@/types/types";

type CaptureListProps = {
    captures: CaptureData[];
};

const CaptureList = ({ captures }: CaptureListProps) => {
    if (captures.length === 0) {
        return (
            <p className="mt-4 text-sm text-zinc-500">
                No captures yet.
            </p>
        );
    }

    return (
        <div className="mt-4 flex flex-wrap justify-center gap-4">
            {captures.map((capture) => (
                <article
                    key={capture.url}
                    className="w-full min-w-0 max-w-sm flex-1 basis-64 overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm"
                >
                    <video
                        className="aspect-video w-full bg-zinc-950 object-contain"
                        controls
                        preload="metadata"
                        aria-label={`Play ${capture.name}`}
                    >
                        <source src={capture.url} />
                        Your browser does not support video playback.
                    </video>
                    <div className="p-4">
                        <h3
                            className="truncate text-sm font-medium text-zinc-900"
                            title={capture.name}
                        >
                            {capture.name}
                        </h3>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default CaptureList;