function settingsComponent(props) {
	return (
		<Page>
			<Section>
				<Text bold align="center">Stardew valley</Text>
				<Toggle
					settingsKey="isShowingSeconds"
					label="Show seconds?"
				/>
				<Toggle
					settingsKey="isSouthHemisphere"
					label="South hemisphere?"
				/>
				<Toggle
					settingsKey="is24Mode"
					label="24 hours mode?"
				/>
				<Toggle
					settingsKey="isDisplayMonth"
					label="Display month?"
				/>
				<Toggle
					settingsKey="isDeactivateScroll"
					label="Deactivate scrolling?"
				/>
			</Section>
			<Text><Link source="https://gitlab.com/nlucassoares/clock">Source code</Link> is available.</Text>
		</Page>
	);
}

registerSettingsPage(settingsComponent);
