// not exactly as per Design, the day would've to be ordinal but that requires some tweaks
export const formatDate = (date: string) => (
    new Intl.DateTimeFormat("en-US", {
        dateStyle: "full"
    }).format(new Date(date))
)
