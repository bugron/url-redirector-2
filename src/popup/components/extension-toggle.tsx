export const ExtensionToggle = ({
  isExtensionEnabled,
  toggleExtension,
}: {
  isExtensionEnabled: boolean
  toggleExtension: () => void
}) => {
  return (
    <label
      htmlFor="AcceptConditions"
      className="relative inline-block h-6 w-11 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
    >
      <input
        type="checkbox"
        id="AcceptConditions"
        className="peer sr-only"
        checked={isExtensionEnabled}
        onChange={toggleExtension}
      />

      <span className="absolute inset-y-0 start-0 m-0.5 size-5 rounded-full bg-white transition-all peer-checked:start-5"></span>
    </label>
  )
}
