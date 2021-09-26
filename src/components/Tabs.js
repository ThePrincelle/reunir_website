function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Tabs(props) {
    let tabs = props.tabs;
    let currentTab = props.currentTab

	return (
		<div className="w-1/2 m-auto mt-10">
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Sélectionnez un filtre.
				</label>
				{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
				<select
					id="tabs"
					name="tabs"
					className="block w-full focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
					defaultValue={tabs.find((tab) => tab.currentTab)}
				>
					{tabs.map((tab) => (
						<option key={tab}>{tab}</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<nav
					className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
					aria-label="Tabs"
				>
					{tabs.map((tab, tabIdx) => (
						<a
							key={tab}
							onClick={() => {props.setCurrentTab(tab)}}
							className={classNames(
								currentTab == tab
									? "text-gray-900"
									: "text-gray-500 hover:text-gray-700",
								tabIdx === 0 ? "rounded-l-lg" : "",
								tabIdx === tabs.length - 1
									? "rounded-r-lg"
									: "",
								"group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
							)}
							aria-current={currentTab == tab ? "page" : undefined}
						>
							<span>{tab}</span>
							<span
								aria-hidden="true"
								className={classNames(
									currentTab == tab
										? "bg-yellow-500"
										: "bg-transparent",
									"absolute inset-x-0 bottom-0 h-0.5"
								)}
							/>
						</a>
					))}
				</nav>
			</div>
		</div>
	);
}
