<!-- @format -->

<template>
	<nav>
		<v-navigation-drawer v-model="open" class="coll">
			<v-list nav dense class="coll">
				<v-list-item-group class="px-4 mx-2">
					<v-list-item class="list-item py-5 my-5" router to="institution">
						<v-list-item-title>
							<v-icon>mdi-domain</v-icon>
							<button
								@click="institutionLogin"
								class="ps-4 text"
								router
								to="admin"
								style="font-size: 15px"
							>
								Add Members
							</button>
						</v-list-item-title>
					</v-list-item>
					<v-list-item class="list-item pb-5 mb-5" router to="memberView" flat>
						<v-list-item-title router to="memberView">
							<v-icon>mdi-eye </v-icon>
							<button
								@click="getMembers"
								class="ps-4 text"
								style="font-size: 15px"
								flat
							>
								View Members
							</button>
						</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar class="" flat>
			<v-app-bar-nav-icon
				class="hidden-md-and-up"
				@click.stop="open = !open"
			></v-app-bar-nav-icon>
			<v-toolbar-title class="word"
				>SECDOC <span>{{ orgs.orgName }}</span></v-toolbar-title
			>

			<input placeholder="search" class="input form-control" />

			<v-btn icon>
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</v-toolbar>
	</nav>
	<v-container>
		<v-card>
			<div class="rounded">
				<v-row class="p-4 bg-secondary">
					<v-col cols="3">
						<div class="table-text"><h6>Name</h6></div>
					</v-col>
					<v-col cols="5">
						<div class="table-text"><h6>Address</h6></div>
					</v-col>
					<v-col cols="4">
						<div class="table-text"><h6>Position</h6></div>
					</v-col>
				</v-row>
			</div>
			<div height="100" flat v-for="member in members" :key="member._userAdd">
				<v-row class="p-4">
					<v-col cols="3">
						<div class="">
						 
							{{ member.name }}
						</div>
					</v-col>
					<v-col cols="5" color="grey">
						<div class="bg">{{ member._userAdd }}</div>
					</v-col>
					<v-col cols="4">
						<div class="">{{ member.position }}</div>
					</v-col>
				</v-row>
			</div>
		</v-card>
	</v-container>
</template>

<script>
	import { ethers } from "ethers";
	import { abi, contractAddress } from "../../secDocConstants";

	export default {
		name: "viewOrg",
		data() {
			return {
				open: true,
				group: null,
				members: [],
				orgs: {},
			};
		},
		methods: {
			async institutionLogin() {
				if (typeof window.ethereum !== "undefined") {
					await window.ethereum.request({ method: "eth_requestAccounts" });
				}

				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = await provider.getSigner();
				console.log(signer);
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const orgs = await contract.testingAddress(signer.getAddress());
				return orgs;
			},

			async getMembers() {
				let mem = [];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const members = await contract.getAllOperators();
				console.log(members)
				
				// members.forEach((el) => {
				// 	if (el.organisation == this.orgs.orgName) {
				// 		mem.push(el);
				// 	}
				// });

				return members;
				console.log(mem);
			},
		},

		async created() {
			this.orgs = await this.institutionLogin();
			this.members = await this.getMembers();
		},
	};
</script>
<style scoped>
	.word {
		color: #095073;
		font-size: large;
	}
</style>
