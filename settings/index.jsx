function settingsComponent(props) {
	return (
		<Page>
			<Section
				title={
				<Text bold align="center">
					Stardew valley
				</Text>
			}
			/>
            <Toggle
                settingsKey="isShowingSeconds"
                label="Show seconds?"
            />
			<Text><Link source="https://gitlab.com/nlucassoares/clock">Source code</Link> is available</Text>
		</Page>
	);
}

registerSettingsPage(settingsComponent);
