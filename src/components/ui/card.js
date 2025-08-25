//Utility: combine class names, removing falsy values (null, undefined, false, "")
export function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export function Card(props) {
  return (
    <div
      {...props}  //make sure the children (img, accent bar, CardHeader, CardContent) are placed inside the <div>.
      //make sure the <div>` has both: the default card styles plus any extra styles you passed from UserCard
      className={classNames(
        "rounded-2xl bg-white shadow-sm border border-gray-200",
        props.className
      )}
    />
  );
}

export function CardHeader(props) {
  return <div {...props} className={classNames("p-4 pb-0", props.className)} />;
}

export function CardTitle(props) {
  return <div {...props} className={classNames("font-semibold", props.className)} />;
}

export function CardContent(props) {
  return <div {...props} className={classNames("p-4 pt-2", props.className)} />;
}
